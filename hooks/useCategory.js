import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchCategories = async() => {
    try {
        const response = await axiosClient.get('/category');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createCategory = async({category}) => {
    try {
        const response = await axiosClient.post('/category',{category});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editCategory = async({category,_id}) => {
    try {
        
        const response = await axiosClient.put(`/category/${_id}`,{category});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateCategory = async({_id}) => {
    try {
        const response = await axiosClient.put(`/category/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetCategories =()=>{
    return useQuery('CATEGORIES',fetchCategories)
}

export const usePostCategory = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createCategory,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('CATEGORIES');
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

export const usePutCategory = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editCategory,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('CATEGORIES');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateCategory = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateCategory,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('CATEGORIES');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}