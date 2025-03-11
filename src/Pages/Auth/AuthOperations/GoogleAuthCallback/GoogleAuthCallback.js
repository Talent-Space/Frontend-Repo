import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'cookie-universal';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const cookies = Cookie(); // إنشاء كائن للتعامل مع الـ Cookies

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // قراءة الـ Token من الـ Cookies
        const token = cookies.get('XSRF-TOKEN');
        console.log(token);
        // if (token) {
        //   // توجيه المستخدم إلى الصفحة الرئيسية
        //   navigate('/');
        // } else {
        //   // في حالة عدم وجود Token، توجيه المستخدم إلى صفحة تسجيل الدخول
        //   navigate('/login');
        // }
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, cookies]);

  return <div>Loading...</div>;
};

export default GoogleAuthCallback;