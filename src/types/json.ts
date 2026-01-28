/**
 * A JSON primitive: string, number, boolean, or null
 */
type JSONPrimitive = string | number | boolean | null | undefined;

/**
 * A JSON object (an object with string keys and JSONValue values)
 */
type JSONObject = { [key: string]: JSONValue };

/**
 * A JSON array (an array of JSONValues)
 */
type JSONArray = JSONValue[];

/**
 * A JSONValue can be a primitive, an array, or an object.
 */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
