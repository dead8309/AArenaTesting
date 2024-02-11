export interface PageParams {
  params: {
    [key: string]: string | string[] | undefined;
  };
}

export interface DomainPageParams extends PageParams {
  params: {
    domain: string;
  };
}

