class ContactController < ApplicationController
  def index
  end

  def create
    redirect_to contact_thanks_path
  end

  def thanks
  end
end