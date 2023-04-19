## Overview

In pest control, scheduled work is done by technicians at various customer locations. I built this app so that Technicians could visualize their daily work orders to better manage and schedule their days.

## Approach Taken

For this project, each work order needed to span the exact y-axis space on the calendar. This brought a few challenges as work order times could overlapped each other. To manage this I broke it down into workable parts.

There are 4 different possibilities for work orders:

<img width="586" alt="Screenshot 2023-04-19 at 10 29 10 AM" src="https://user-images.githubusercontent.com/109235738/233125208-71f55c1b-2fd0-4a7a-a4ac-d40cd71ee21a.png">

- "Apart" and "Touching" I considered "Normal" blocks and we're simply rendered with a neutral colored div or no div between them.
- For the "Partial" and "Complete Overlapping" blocks, I used absolute positioning to render the overlapping parts over the previous div.
- For calculating the height of the blocks, I set 1 hour to equal 50px in CSS. If a work order duration was 2 hours, the calculation would be 120 minutes / 60 = 2 hours ---> 2 hours * 50px/h = 100px height.

## Possible future improvements

- Right now, the start and end times are hardcoded from 6AM to 6PM. Allowing the user to decide their time boundaries would be ideal. 
- An assumption could be made that the user would want alerts if orders are too close / overlapping. This would ensure technicians have time for transportation between orders. I would validate this assumption by talking to customers.
- Adding tests to this project would be another thing I would do to ensure the robustness of edge case possibilities. (work orders after end times, multiple complete overlapping work orders)

## Steps To Run Application

## This project is using 
- Ruby 3.2.2
- Rails 7.0.4.3
- PostgreSQL
- React V18

### Front End
- `npm install`
- `npm run client`

## Back End
- `cd server`
- `rails db:create`
- `rails db:migrate`
- `rake import`
- `rails s -p 5000`
