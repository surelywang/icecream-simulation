#version 330

uniform mat4 u_view_projection;
uniform mat4 u_model;

uniform sampler2D u_texture_2;
uniform vec2 u_texture_2_size;

uniform float u_normal_scaling;
uniform float u_height_scaling;

in vec4 in_position;
in vec4 in_normal;
in vec4 in_tangent;
in vec2 in_uv;

out vec4 v_position;
out vec4 v_normal;
out vec2 v_uv;
out vec4 v_tangent;

float h(vec2 uv) {
  // You may want to use this helper function...

  float u = uv[0];
  float v = uv[1];
  return texture(u_texture_2, uv).r;
}

void main() {
  // YOUR CODE HERE

  // Modify s.t. function also displaces the vertex positions
  // in the direction of the original model space vertex normal scaled by the u_height_scaling variable

  v_normal = normalize(u_model * in_normal);
  v_tangent = normalize(u_model * in_tangent);
  v_uv = in_uv;

  vec4 displaced_Pos = in_position + h(v_uv) * u_height_scaling * normalize(v_normal);
  v_position = u_model * displaced_Pos;
  gl_Position = u_view_projection * u_model * displaced_Pos;

}