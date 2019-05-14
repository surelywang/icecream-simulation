#version 330

uniform vec3 cameraPosition;
uniform vec3 light_pos;
uniform vec3 light_intensity;

attribute vec4 color;
attribute vec4 position;
attribute vec4 normal;
attribute vec2 uv;

out vec4 out_color;

void main() {

  // SPECULAR SHADING
  float ka = 0.1;
  float kd = 1.0;
  float ks = 1.0;
  float p = 100.0;
  vec3 Ia = vec3(1.0, 1.0, 1.0);

  vec3 I_rsq = normalize(light_intensity);
  vec3 l = normalize(light_pos - vec3(position));
  vec3 n = normalize(vec3(normal));
  vec3 v = normalize(cameraPosition - vec3(position));
  vec3 h = normalize(l + v);

  vec3 diffuse = max(dot(n, l), 0.0) * kd * I_rsq;
  float specular_angle = max(dot(h, n), 0.0);
  vec3 specular = pow(specular_angle, p) * ks * I_rsq;

  out_color = vec4(((ka * Ia) + diffuse + specular)*vec3(color), 1.0);

}

