export interface Product {
    id: string,
    name: string,
    description: string,
    logo: string,
    dateRelease: Date,
    dateRevision: Date,
}

export interface ApiResponse<T>{
    message: string,
    data?: T,
}
