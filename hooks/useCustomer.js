import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchCustomers = async() => {
    try {
        const response = await axiosClient.get('/customer');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createCustomer = async({name,ci,nit}) => {
    try {
        const response = await axiosClient.post('/customer',{name,ci,nit});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editCustomer = async({name,ci,nit,_id}) => {
    try {
        
        const response = await axiosClient.put(`/customer/${_id}`,{name,ci,nit});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateCustomer = async({_id}) => {
    try {
        const response = await axiosClient.put(`/customer/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetCustomers =()=>{
    return useQuery('CUSTOMERS',fetchCustomers)
}

export const usePostCustomer = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createCustomer,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('CUSTOMERS');
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

export const usePutCustomer = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editCustomer,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('CUSTOMERS');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateCustomer = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateCustomer,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('CUSTOMERS');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}