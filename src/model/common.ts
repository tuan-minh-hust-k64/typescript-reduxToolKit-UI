export interface IPagination{
    _limit: number;
    _total: number;
    _page: number;
};
export interface IListResponse<T>{
    data: T[];
    pagination: IPagination[];
}
export interface IListParams{
    page?: number;
    size?: number;
    sortBy?: string;
    city?: string;
}