def run
    working_dir = File.expand_path File.dirname(__FILE__)
    relative_path = 'js'
    include_files_with = ['.js']
    exclude_files_with = ['-compiled.js', 'bundle.js']
    delete_files_with = ['-compiled.js', '-compiled.js.map']

    Dir.chdir("#{working_dir}/#{relative_path}") do
        files = Dir["#{working_dir}/#{relative_path}/*.*"]
        files.each do |file|
            delete_files_with.each do |match|
                if file.include?(match)

                    p "Deleting `#{file}`..."
                    begin
                        File.delete(file)
                    rescue StandardError => e
                        p "Warning: Error `#{e}`"
                    end
                end
            end

            include_files_with.each do |match|
                if file.include?(match)
                    if skip_file?(file, exclude_files_with)
                        p "Skipping file `#{file}`..."
                        next
                    end
                    exclude_files_with.each do |match|
                        if file.include?(match)
                            p "Skipping file `#{file}`..."
                            next
                        end
                    end
                    p "Compiling `#{file}` with Babel: "
                    file_no_ext = File.basename(file, ".*" )
                    output_file = "#{working_dir}/#{relative_path}/#{file_no_ext}-compiled.js"
                    command = "babel #{file} --out-file #{output_file} --source-map"
                    print "\t"
                    p command
                    `#{command}`
                end
            end
        end
    end
    browserify_command = "browserify #{working_dir}/#{relative_path}/*-compiled.js -o js/bundle.js"
    p browserify_command
    `#{browserify_command}`
    unless ARGV.include?('--skip-uglify')
        uglify_command = "uglifyjs js/bundle.js --mangle --compress -o js/bundle.js"
        p uglify_command
        `#{uglify_command}`
    end
end

def skip_file?(file, exclude_files_with)
    skip = false
    exclude_files_with.each do |match|
        skip = true if file.include?(match)
    end
    skip
end

run