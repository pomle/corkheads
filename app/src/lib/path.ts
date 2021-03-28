import { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

type ParamCodec<SourceType> = {
  encode: (source: SourceType) => string;
  decode: (param: string) => SourceType;
};

export type PathCodec = {
  [key: string]: ParamCodec<any>;
};

type Params<Source extends {}> = {
  [key in keyof Source]: string;
};

type InputParams<CodecType extends PathCodec> = {
  [Prop in keyof CodecType]: Parameters<CodecType[Prop]["decode"]>[0];
};

type OutputParams<CodecType extends PathCodec> = {
  [Prop in keyof CodecType]: ReturnType<CodecType[Prop]["decode"]>;
};

export interface Path<PathCodecType extends PathCodec> {
  path: string;
  codec: PathCodecType;
  url(params: InputParams<PathCodecType>): string;
  encode(params: InputParams<PathCodecType>): Params<PathCodecType>;
  decode(params: Params<PathCodecType>): OutputParams<PathCodecType>;
  append<AdditionalPathCodecType extends PathCodec>(
    pathName: string,
    codec: AdditionalPathCodecType
  ): Path<PathCodecType & AdditionalPathCodecType>;
}

export function createPath<PathCodecType extends PathCodec>(
  pathName: string,
  codec: PathCodecType
): Path<PathCodecType> {
  return {
    path: pathName,
    codec,

    encode(params) {
      const encoded: any = {};
      for (const key of Object.keys(params)) {
        encoded[key] = codec[key].encode(params[key]);
      }
      return encoded;
    },

    decode(params) {
      const decoded: any = {};
      for (const key of Object.keys(params)) {
        decoded[key] = codec[key].decode(params[key]);
      }
      return decoded;
    },

    url(params) {
      const encoded = this.encode(params);
      return Object.entries(encoded).reduce((pathName, [key, value]) => {
        return pathName.replace(":" + key, value);
      }, pathName);
    },

    append<AdditionalPathCodecType extends PathCodec>(
      pathName: string,
      addCodec: AdditionalPathCodecType
    ) {
      return createPath(this.path + pathName, { ...codec, ...addCodec });
    },
  };
}

export function createCodec<T>(
  encode: (source: T) => string,
  decode: (source: string) => T
): ParamCodec<T> {
  return {
    encode,
    decode,
  };
}

export function usePath<PathCodecType extends PathCodec>(
  path: Path<PathCodecType>
) {
  const raw = useParams<Params<PathCodecType>>();
  const params = path.decode(raw);

  return {
    params,
    url() {
      return path.url(params);
    },
  };
}

type PathSet = Record<string, Path<PathCodec>>;

type PathNavigator<T extends Path<PathCodec>> = (
  params: Parameters<T["url"]>[0]
) => void;

type PathNavigatorSet<T extends PathSet> = {
  [K in keyof T]: PathNavigator<T[K]>;
};

export function useNavigator<T extends PathSet>(paths: T): PathNavigatorSet<T> {
  const history = useHistory();

  return useMemo(() => {
    return Object.entries(paths).reduce((routes, [key, path]) => {
      routes[key] = (params: any) => {
        const url = path.url(params);
        history.push(url);
      };

      return routes;
    }, {} as Record<string, any>) as PathNavigatorSet<T>;
  }, [history, paths]);
}
