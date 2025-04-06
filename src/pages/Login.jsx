import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(form.email, form. password);
            navigate('/feed');
        } catch {
            setError('Login failed. Check your credentials.');
        }
    }
     
    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                />
                <input 
                placeholder="Password"
                value={form.password}
                type="password"
                onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login