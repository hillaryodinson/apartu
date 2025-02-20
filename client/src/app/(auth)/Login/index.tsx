import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../../utils/zod";
import { z } from "zod";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { ApiResponse, AuthResponse } from "../../../utils/types";
// import { useAuth } from "../../../providers/auth-provider";
import { useUserStore } from "../../../store/user-store";

const LoginPage = () => {
    const params = useParams();
    // const context = useAuth();
    const redirect = useNavigate();
    const setSession = useUserStore(state => state.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmit = (data: z.infer<typeof LoginSchema>) => {

    api.post('/auth/login', data).then((response) => {
        if (response.status == 200)
        {
            const { data, success } = response.data as ApiResponse<AuthResponse>;
            if (success)
            {
                if (data) {
                    
                    alert("Login was successful");
                    
                    // context.login(data);
                    setSession(data);
                    //check for callbackurl
                    const callback = params.redirect || '/dashboard';
                    redirect(callback);
                }
            }
        }else{
            throw new Error('Invalid username or password')
        }
    }).catch((errors)=>{
        alert(errors);
    })
  };

  return (
    <>
      <div>Login Page</div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <input {...register("email")} type="email" placeholder="Email" />
          {errors.email && <><br/><small>{errors.email?.message}</small></>}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && <><br/><small>{errors.password?.message}</small></>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginPage;
