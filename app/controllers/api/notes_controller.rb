class Api::NotesController < ApplicationController

    def index
        notes = Note.all
        render json: notes
    end

    def count
        notes = Note.all.length
        render json: notes
    end

    def create
        note = Note.new(
            notable_type: params[:notable_type],
            notable_id: params[:notable_id],
            user_id: params[:user_id],
            content: params[:content]
        )
        if note.save
            render json: note, status: 201
        else
            render json: {errors: note.errors.full_messages}, status: 422
        end
    end

    def show
        note = Note.find(params[:id])
        render json: note
    end

    # def create
    #     note = Note.new(
    #         user_id: params[:user_id], 
    #         contact_id: params[:contact_id], 
    #         content: params[:content])
    #     if note.save
    #         render json: note, status: 201
    #     else
    #         render json: {errors: note.errors.full_messages}, status: 422
    #     end
    # end

    def destroy
        note = Note.find_by(id: params[:id])
        if note
            note.destroy
            render json: {}, status: 200
        else
            render json: { errors: "Note not found" }, status: 404
        end
    end

end
