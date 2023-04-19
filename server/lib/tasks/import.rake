require 'csv'

desc "Imports CSV files into tables from csv_data folder"
task :import => [:environment] do
    locations_path = File.join Rails.root, 'csv', 'locations.csv'
    technicians_path = File.join Rails.root, 'csv', 'technicians.csv'
    work_orders_path = File.join Rails.root, 'csv', 'work_orders.csv'

    ## Insert new records
    CSV.foreach(locations_path, :headers => true) do |row|
        location = {}
        location[:name] = row["name"]
        location[:city] = row["city"]

        old_location = Location.where(location)

        if old_location.exists?
            old_location.update(location)
        else
            Location.create!(location)
        end
    end

    CSV.foreach(technicians_path, :headers => true) do |row|
        technician = {}
        technician[:name] = row["name"]

        old_technician = Technician.where(technician)

        if old_technician.exists?
            old_technician.update(technician)
        else
            Technician.create!(technician)
        end
    end

    CSV.foreach(work_orders_path, :headers => true) do |row|
        work_order = {}
        work_order[:technician_id] = row["technician_id"].to_i
        work_order[:location_id] = row["location_id"].to_i
        work_order[:time] = DateTime.parse(row["time"])
        work_order[:duration] = row["duration"].to_i
        work_order[:price] = row["price"].to_i

        old_work_order = WorkOrder.where(work_order)

        if old_work_order.exists?
            old_work_order.update(work_order)
        else
            WorkOrder.create!(work_order)
        end
    end
end