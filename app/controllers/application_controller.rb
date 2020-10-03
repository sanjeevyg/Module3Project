class ApplicationController < ActionController::API
    def authenticate 
        header = request.headers["Authorization"]

        if !header 
            render json: { error: "No token presented"}, status: :unauthorized 
        else 
            begin
                token = header.split(" ")[1]
                secret = Rails.application.secret_key_base
                payload = JWT.decode(token, secret)[0]

                @user = User.find payload["user_id"]
            rescue
                render json: { message: "Bad token" }, status: :unauthorized
            end
        end
    end

  
end
