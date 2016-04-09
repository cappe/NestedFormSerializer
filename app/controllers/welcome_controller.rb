class WelcomeController < ApplicationController
	def index
	end

	def submit

		puts params[:data]

		respond_to do |format|
			format.js {}
		end
	end
end
