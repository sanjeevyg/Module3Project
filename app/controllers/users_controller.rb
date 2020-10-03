class UsersController < ApplicationController
    before_action :authenticate, only: [:profile, :profile_by_username]

    def index 
        @users = User.all 
        render json: @users 
    end

    def show 
        @user = User.find(params[:id])
        render json: @user
    end

    # def profile 
    #     render json: @user
    # end

    # def profile_by_username 
    #     @user = User.find_by(username: params[:username])
    #     render json: @user
    # end

    def create 
        @user = User.new(user_params)
        if @user.valid?
            @user.save
            render json: @user
        else 
            render json: @user.errors
        end
    end

    def update 
        @user = User.find(params[:id])
        if @user.update(user_params)
            render json: @user
        else 
            render json: @user.errors 
        end
    end

    def destroy 
        @user = User.find(params[:id])
        @user.destroy
        render json: {message: "user is deleted!"}
    end

    private 

    def user_params 
        params.require(:user).permit([:name, :username, :email, :password])
    end
end
