
export type dataType = {
  id: number
  full_name: string,
  gender: string,
  dob: string,
  household_number: number,
  contact: number,
  region: string,
  card_id: string,
  community: string,
  district: string,
  pre_finance: string,
  pre_finance_amount: number,
  farm_input: string,
  farm_input_items: string[],
  pre_finance_date: string,
  farm_input_date: string,
  voice_consent: string,
  image: string
}[]
export const Data: dataType = [
  {
    "id": 1,
    "full_name": "JOHN DOE",
    "gender": "Male",
    "image": "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
    "dob": "12 Jan 2000",
    "household_number": 12,
    "contact": 559876568,
    "region": "Upper East",
    "card_id": "GH25876657765",
    "community": "Community 1",
    "district": "District 1",
    "pre_finance": "Yes",
    "farm_input": "Yes",
    "farm_input_items": ["fertilizer", "  seeds"],
    "pre_finance_date": "15 Nov 2023",
    "farm_input_date": "15 Nov 2023",
    "voice_consent": "yes",
    "pre_finance_amount": 20000,

  },
]