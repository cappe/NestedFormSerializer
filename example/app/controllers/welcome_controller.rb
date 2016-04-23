class WelcomeController < ApplicationController
	def index
	end

	def submit
		data = params[:data]

		data[:contact_name] = 'New Name'
		data[:addresses][:billing][:street] = 'New Billing Street 2a'
		data[:addresses][:shipping][:street] = 'New Shipping Street 141'
		data[:addresses][:shipping][:zip] = '101010'
		data[:credit][:number] = '123123123'
		data[:credit][:csv] = '098'

		respond_to do |format|
			format.json { render :json => data }
		end
	end
end
