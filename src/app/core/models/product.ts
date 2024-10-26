export interface Product {
    id: string,
    name: string,
    description: string,
    logo: string,
    dateRelease: string,
    dateRevision: string,
}

export interface ApiResponse<T>{
    message: string,
    data?: T,
}
