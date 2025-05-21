export interface Resume {
  id: number
  name: string
  description: string
  date: Date 
  status: string
  portfolios: null | unknown 
  town: string
  phone: string
  age: number
  birth_date: Date 
  email: string
  listing_id: number
  photo: string
}

export interface Status {
  label: string,
  status: string
}
