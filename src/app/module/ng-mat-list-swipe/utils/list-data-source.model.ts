export interface IListDataSource<T> {
    title: string;
    icon?: string;
    img?: string;
    description?: string;
    leftBorder?: string;
    rightBorder?: string;
    data: T;
}
