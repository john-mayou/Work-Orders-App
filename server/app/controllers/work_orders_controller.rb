require 'json'

class WorkOrdersController < ActionController::API
    def index

    end

    def get_jobs
        sql = "
        SELECT 
        t.name AS technician_name,
        JSON_AGG(JSON_BUILD_OBJECT(
            'id', wo.id,
            'location_name', l.name, 
            'location_city', l.city,
            'start_time', wo.time,
            'duration', wo.duration,
            'price', wo.price
        ) ORDER BY wo.time ASC) AS work_orders
        FROM work_orders AS wo
        JOIN locations AS l ON l.id = wo.location_id
        JOIN technicians AS t ON t.id = wo.technician_id
        GROUP BY t.name;"

        jobs = ActiveRecord::Base.connection.execute(sql)

        jobs = jobs.map do |technician|
            technician["work_orders"] = JSON.parse(technician["work_orders"])
            technician
        end

        render json: jobs
    end
end