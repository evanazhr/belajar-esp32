exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "sensor_log",
    {
      id: "id", // shorthand for SERIAL PRIMARY KEY
      device_id: { type: "varchar(255)", notNull: true },
      temperature: { type: "double precision", notNull: true },
      humidity: { type: "double precision", notNull: true },
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    { ifNotExists: true }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("sensor_log");
};
