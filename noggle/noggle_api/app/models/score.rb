class Score < ApplicationRecord
  belongs_to :user
  belongs_to :game

  def self.high_scores
    high_scores = self.all.order('points DESC').limit(10)
    high_scores.map {|score| {points: score.points, user: score.user.username} }
  end
end
