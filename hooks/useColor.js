import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchColors = async() => {
    try {
        const response = await axiosClient.get('/color');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createColor = async({color,value}) => {
    try {
        const response = await axiosClient.post('/color',{color,value});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editColor = async({color,value,_id}) => {
    try {
        
        const response = await axiosClient.put(`/color/${_id}`,{color,value});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateColor = async({_id}) => {
    try {
        const response = await axiosClient.put(`/color/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetColors =()=>{
    return useQuery('COLORS',fetchColors)
}

export const usePostColor = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createColor,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('COLORS');
            console.log('sucess')
        },
        onError: ()=>{
            console.log('error')
        }
    });

    const handlePostRequest = (payload)=> {
        mutate(payload);
    }

    return[
        handlePostRequest
    ];
}

export const usePutColor = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editColor,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('COLORS');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateColor = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateColor,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('COLORS');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}