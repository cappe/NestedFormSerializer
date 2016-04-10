Rails.application.routes.draw do
	root 'welcome#index'
	get '/submit', to: 'welcome#submit'
end
