export interface IListDataSource<T> {
    title: string;
    icon?: string;
    img?: string;
    description?: string;
    data: T;
}
