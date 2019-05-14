#version 330

uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

uniform sampler2D u_texture_1;

in vec4 v_position;
in vec4 v_normal;
in vec2 v_uv;

out vec4 out_color;

void main() {
  // YOUR CODE HERE

  // Sample from the u_texture_1 uniform using the built-in function:
  // texture(sampler2D tex, vec2 uv), which samples from a texture tex at the texture space coordinate uv

  out_color = texture(u_texture_1, v_uv);

}