import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const {register} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState(
        {
            email: '',
            password: '',
            password_confirmation:'',
            first_name: '',
            last_name: '',
            bio: '',
            username: '',
        });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.password_confirmation){
            return setError("Passwords do not match.");
        }

        try {
            register(form.email, form.password, form.first_name, form.last_name, form.bio, form.username);
            navigate('/feed');
        } catch (err) {
            console.log(err);
            setError('Registration Failed. Try again.')
        }
    };

    return (
        <div>
            <h1>Create your CC Hive Account</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Email"
                    value={form.email}
                    type="email" 
                    onChange={(e) => {setForm({...form, email: e.target.value})}}/>
                <input 
                    placeholder="First Name"
                    value={form.first_name}
                    type="text" 
                    onChange={(e) => {setForm({...form, first_name: e.target.value})}}/>
                <input 
                    placeholder="Last Name"
                    value={form.last_name}
                    type="text" 
                    onChange={(e) => {setForm({...form, last_name: e.target.value})}}/>
                <input 
                    placeholder="Username"
                    value={form.username}
                    type="text" 
                    onChange={(e) => {setForm({...form, username: e.target.value})}}/>
                <input 
                    placeholder="Password"
                    value={form.password}
                    type="password" 
                    onChange={(e) => {setForm({...form, password: e.target.value})}}/>
                <input 
                    placeholder="Password Confirmation"
                    value={form.password_confirmation}
                    type="password" 
                    onChange={(e) => {setForm({...form, password_confirmation: e.target.value})}}/>
                <button type="submit">Sign Up</button>    
            </form>
        </div>
    );
};

export default Register;