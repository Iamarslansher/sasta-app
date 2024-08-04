// src/Login.js
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaUserAlt, FaUserShield, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../config/fireBase";

const Login = () => {
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const logIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please enter both email and password");
    }
    signIn({ email, password, role }, navigate);
  };

  return (
    <Container>
      <Form>
        <Title>Login</Title>
        {/* <RoleSwitcher>
          <RoleLabel>
            <RoleInput
              type="radio"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={handleRoleChange}
            />
            <FaUserAlt />
            Client
          </RoleLabel>
          <RoleLabel>
            <RoleInput
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={handleRoleChange}
            />
            <FaUserShield />
            Admin
          </RoleLabel>
        </RoleSwitcher> */}
        <InputWrapper>
          <FaEnvelope />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <FaLock />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <Button onClick={logIn}>Login</Button>
        <SignupLink>
          Don't have an account?
          <a href="\" onClick={() => navigate("/")}>
            Sign Up
          </a>
        </SignupLink>
      </Form>
    </Container>
  );
};

export default Login;

// Styled Components
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const RoleSwitcher = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const RoleLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;
  color: #555;
`;

const RoleInput = styled.input`
  display: none;
  &:checked + svg {
    color: #007bff;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: none;
  background: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  &:hover {
    background: #0056b3;
  }
`;

const SignupLink = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #555;
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
