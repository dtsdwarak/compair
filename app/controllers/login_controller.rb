class LoginController < ApplicationController
  
  def index
  end

  def landing
  end

  def result

  	@name1 = params["name1"]
  	@name2 = params["name2"]
  	@name3 = params["name3"]



    sum2=0
    sum3=0
    
    @name2.each_byte do |c|
      sum2+=c
    end
    
    @name3.each_byte do |c|
      sum3+=c
    end
    
    if (sum2>sum3) then
      @win=@name2
      @lose=@name3
    else
      @win=@name3
      @lose=@name2
    end

    if (@name1=="Jason Moses") then
      $message = "I feel that both " +@name2+" and "+@name3+" are not worth for the level of Jason Moses. He should try elsewhere. Please Mr. Moses, go to America!"
    elsif (@name2=="Jason Moses") then
      $message = "I feel that both " +@name1+" and "+@name3+" are not worth for the level of Jason Moses. He should try elsewhere. Please Mr. Moses, go to America!"
    elsif (@name3=="Jason Moses") then
      $message = "I feel that both " +@name1+" and "+@name2+" are not worth for the level of Jason Moses. He should try elsewhere. Please Mr. Moses, go to America!"
    else
    $message = "I feel that " + @win + " is a better match for "+@name1+" than "+@lose
  end

  end

end
