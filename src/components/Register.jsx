import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form-title">Registration</h1>
                <label className="form-label">
                    Email:
                    <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label className="form-label">
                    Password:
                    <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label className="form-label">
                    Confirm Password:
                    <input
                        className="form-input"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </label>
                <br />
                <label className="form-label">
                    Profile Photo:
                    <input
                        className="form-input"
                        type="url"
                        name="avatar"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </label>
                <br />
                <button className="form-button" type="submit">Submit</button>
            </form>
        </>
    );
};

export default Register;