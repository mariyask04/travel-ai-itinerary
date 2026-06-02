import api from "@/lib/axios"

export const getItineraries = async () => {
    const response = await api.get('/itinerary/my');
    return response.data
}