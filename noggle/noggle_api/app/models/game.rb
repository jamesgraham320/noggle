class Game < ApplicationRecord
  has_many :scores
  has_many :users, through: :scores

  def initialize
    super

    until self.solutions.length > 15
      self.scramble = self.class.generate_scramble
      self.solutions = self.get_definitions
    end
  end

  def self.generate_scramble
    letters = ('a'..'z').to_a
    vowels = %w(a e i o u)
    scramble = ""
    6.times { scramble += letters.sample}
    3.times { scramble += vowels.sample}
    return scramble
  end

  def get_definitions
    response = RestClient.get("http://www.anagramica.com/all/#{self.scramble}")
    parsed = JSON.parse(response)
    selected = parsed["all"].select {|word| word.length > 2}
  end
end
