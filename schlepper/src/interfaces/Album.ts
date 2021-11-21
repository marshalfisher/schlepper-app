export interface Album {
  title?: string;
  artist?: string;
  picURL?: string;
  thumb?: string;
  uri?: string;
  id?: string;
  label?: string[] | undefined;
  year?: string;
  formats?: Format[] | undefined;
}
export interface Format {
  name: string;
}
