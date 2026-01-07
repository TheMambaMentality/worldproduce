class StoreController < ApplicationController
  def index
    @stores = [
      {
        name: "世界の昆虫爬虫類館",
        facility: "堺・緑のミュージアム ハーベストの丘",
        address: "大阪府堺市南区鉢ヶ峯寺2405-1",
        tel: "072-296-9911",
        image: "world_insect_reptile.jpg",
        map_url: "https://www.google.com/maps?q=大阪府堺市南区鉢ヶ峯寺2405-1"
      },
      {
        name: "輝く昆虫ワールド",
        facility: "淡路ファームパーク イングランドの丘",
        address: "兵庫県南あわじ市八木養宜上1401",
        tel: "0799-43-2626",
        image: "shining_insect_world.jpg",
        map_url: "https://www.google.com/maps?q=兵庫県南あわじ市八木養宜上1401"
      },
      {
        name: "クリスタルアドベンチャー",
        facility: "淡路ファームパーク イングランドの丘",
        address: "兵庫県南あわじ市八木養宜上1401",
        tel: "0799-43-2626",
        image: "crystal_adventure.jpg",
        map_url: "https://www.google.com/maps?q=兵庫県南あわじ市八木養宜上1401"
      },
      {
        name: "昆虫爬虫類館",
        facility: "神崎農村公園 ヨーデルの森",
        address: "兵庫県神崎郡神河町猪篠1868",
        tel: "0790-32-2911",
        image: "insect_reptile_kamikawa.jpg",
        map_url: "https://www.google.com/maps?q=兵庫県神崎郡神河町猪篠1868"
      },
      {
        name: "クリスタル博士のトレジャーストーン研究所",
        facility: "和歌山マリーナシティ",
        address: "和歌山県和歌山市毛見1527",
        tel: "0570-064-358",
        image: "crystal_doctor_treasure.jpg",
        map_url: "https://www.google.com/maps?q=和歌山県和歌山市毛見1527"
      },
      {
        name: "ふれあい昆虫・爬虫類館",
        facility: "おかやまフォレストパーク ドイツの森",
        address: "岡山県赤磐市仁堀中2006",
        tel: "086-958-2111",
        image: "fureai_insect_reptile.jpg",
        map_url: "https://www.google.com/maps?q=岡山県赤磐市仁堀中2006"
      },
      {
        name: "世界の昆虫爬虫類館",
        facility: "信州塩尻農業公園 チロルの森",
        address: "長野県塩尻市北小野相吉5050",
        tel: "0263-88-9034",
        image: "world_insect_reptile_shinshu.jpg",
        map_url: "https://www.google.com/maps?q=長野県塩尻市北小野相吉5050"
      }
    ]
  end
end