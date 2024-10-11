import React from 'react';
import UserForm from './UserForm';
import AdminLogin from './AdminLogin';
import {
  useNavigate,
} from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center flex-col">
      <div className="flex items-center flex-col align-middle pt-20">
        <UserForm />
        <div className="pt-10">
          <button
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
            border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-40"
            onClick={() => navigate("/admin/login")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home