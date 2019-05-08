#version 330

uniform vec4 u_color;
uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

in vec4 v_position;
in vec4 v_normal;
in vec2 v_uv;

out vec4 out_color;

void main() {
  // YOUR CODE HERE

  // SPECULAR SHADING
  float ka = 0.1;
  float kd = 1.0;
  float ks = 1.0;
  float p = 100.0;
  vec3 Ia = vec3(1.0, 1.0, 1.0);

  vec3 I_rsq = normalize(u_light_intensity);
  vec3 l = normalize(u_light_pos - vec3(v_position));
  vec3 n = normalize(vec3(v_normal));
  vec3 v = normalize(u_cam_pos - vec3(v_position));
  vec3 h = normalize(l + v);

  vec3 diffuse = max(dot(n, l), 0.0) * kd * I_rsq;
  float specular_angle = max(dot(h, n), 0.0);
  vec3 specular = pow(specular_angle, p) * ks * I_rsq;

  out_color = vec4(((ka * Ia) + diffuse + specular)*vec3(u_color), 1.0);

}

