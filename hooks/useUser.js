
import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchUsers = async() => {
    try {
        const response = await axiosClient.get('/user');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createUser = async({email,user,password,rol,name,lastName,ci}) => {
    try {
        const response = await axiosClient.post('/user',{email,user,password,rol,name,lastName,ci});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editUser = async({_id,email,user,password,rol,name,lastName,ci}) => {
    try {
        
        const response = await axiosClient.put(`/user/${_id}`,{email,user,password,rol,name,lastName,ci});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateUser = async({_id}) => {
    try {
        const response = await axiosClient.put(`/user/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetUsers =()=>{
    return useQuery('USERS', fetchUsers)
}

export const usePostUser = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createUser,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('USERS');
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

export const usePutUser = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editUser,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('USERS');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateUser = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateUser,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('USERS');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}