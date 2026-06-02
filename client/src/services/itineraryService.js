import api from "@/lib/axios"

export const getItineraries = async () => {
    const response = await api.get('/itinerary/my');
    return response.data;
}

export const getItineraryById = async (itineraryId) => {
    const response = await api.get(`/itinerary/${itineraryId}`);
    return response.data;
}

export const getSharedItinerary = async (sharedId) => {
    const response = await api.get(`/itinerary/shared/${sharedId}`);
    return response.data;
}