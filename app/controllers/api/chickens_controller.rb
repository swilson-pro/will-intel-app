class Api::ChickensController < ApplicationController
    def index
        render json: Chicken.all
    end
end
