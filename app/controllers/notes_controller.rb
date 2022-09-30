class NotesController < ApplicationController

    def index
        notes = Note.all
        render json: notes
    end

    def show
        note = Note.find(params[:id])
        render json: note
    end

    def create
        note = Note.new(
            user_id: params[:user_id], 
            contact_id: params[:contact_id], 
            content: params[:content])
        if note.save
            render json: note, status: 201
        else
            render json: {errors: note.errors.full_messages}, status: 422
        end
    end

end
