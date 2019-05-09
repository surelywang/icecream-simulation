#version 330

attribute mat4 projectionMatrix;
attribute mat4 modelViewMatrix;

uniform sampler2D u_texture_2;
uniform vec2 u_texture_2_size;

uniform float u_normal_scaling;
uniform float u_height_scaling;

attribute vec4 position;
attribute vec4 normal;
attribute vec4 tangent;
attribute vec2 uv;

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

  v_normal = normalize(modelViewMatrix * in_normal);
  v_tangent = normalize(modelViewMatrix * in_tangent);
  v_uv = in_uv;

  vec4 displaced_Pos = position + h(v_uv) * u_height_scaling * normalize(v_normal);
  v_position = modelViewMatrix * displaced_Pos;
  gl_Position = u_view_projection * modelViewMatrix * displaced_Pos;

}