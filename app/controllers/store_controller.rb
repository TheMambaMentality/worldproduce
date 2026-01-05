class StoreController < ApplicationController
  def index
    @stores = [
      # 後で実データに差し替えOK（今は箱）
      { name: "店舗A", facility: "商業施設A", address: "住所A", tel: "000-0000-0000", photo: nil },
      { name: "店舗B", facility: "商業施設B", address: "住所B", tel: "000-0000-0000", photo: nil },
      { name: "店舗C", facility: "商業施設C", address: "住所C", tel: "000-0000-0000", photo: nil },
      { name: "店舗D", facility: "商業施設D", address: "住所D", tel: "000-0000-0000", photo: nil },
      { name: "店舗E", facility: "商業施設E", address: "住所E", tel: "000-0000-0000", photo: nil },
      { name: "店舗F", facility: "商業施設F", address: "住所F", tel: "000-0000-0000", photo: nil },
      { name: "店舗G", facility: "商業施設G", address: "住所G", tel: "000-0000-0000", photo: nil }
    ]
  end
end