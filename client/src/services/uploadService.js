import api from "@/lib/axios"

export const uploadBooking = async(formData)=>{
    const response = await api.post('/upload',formData);
    return response.data
}