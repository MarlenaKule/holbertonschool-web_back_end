-- -- Create indexes for the first letter name.
CREATE INDEX idx_name_first ON names (name(1));