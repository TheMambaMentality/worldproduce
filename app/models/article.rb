class Article < ApplicationRecord
  validates :title, :body, :published_at, presence: true

  scope :published, -> { where("published_at <= ?", Time.current) }

  has_many_attached :images
  validate :images_must_be_supported

  # 一覧で使う「先頭画像」
  def cover_image
    images.first if images.attached?
  end

  private

  def images_must_be_supported
    return unless images.attached?

    allowed = %w[image/jpeg image/png image/webp image/gif]

    images.each do |img|
      next if allowed.include?(img.content_type)

      errors.add(:images, "はJPG/PNG/WebP/GIFのみ対応です（HEICは不可）")
    end
  end
end