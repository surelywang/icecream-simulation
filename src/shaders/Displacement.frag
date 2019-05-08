#version 330

uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

uniform vec4 u_color;

uniform sampler2D u_texture_2;
uniform vec2 u_texture_2_size;

uniform float u_normal_scaling;
uniform float u_height_scaling;

in vec4 v_position;
in vec4 v_normal;
in vec4 v_tangent;
in vec2 v_uv;

out vec4 out_color;

// Returns the height encoded by a height map at
// texture coordinates u and v
// and w,h - width/height of texture
float h(vec2 uv) {
  // You may want to use this helper function...

  float u = uv[0];
  float v = uv[1];

  return texture(u_texture_2, uv)[0];
}

// Calculate the displaced world space normal
// Height map is stored in texture u_texture_2
// Resolution of texture is stored in vec2 u_texture_2_size
void main() {
  // YOUR CODE HERE

  // k_h = height scaling factor (u_height_scaling)
  // k_n = normal scaling factor (u_normal_scaling)

  float u = v_uv[0];
  float v = v_uv[1];

  float width = u_texture_2_size[0];
  float height = u_texture_2_size[1];

  float dU = (h(vec2(u + 1/width, v)) - h(v_uv)) * u_normal_scaling;
  float dV = (h(vec2(u, v + 1/height)) - h(v_uv)) * u_normal_scaling;

  // Tangent-Bitangent-Normal (TBN) Matrix
  vec3 bitangent = cross(vec3(v_normal), vec3(v_tangent));
  mat3 TBN = mat3(vec3(v_tangent), bitangent, vec3(v_normal));

  // Local space normal
  vec3 n_local = vec3(-1 * dU, -1 * dV, 1.0);

  // Displaced model space normal
  vec3 n_displaced = TBN * n_local; // Given a vector in obj space, transform it back to model space by multiplying by TBN matrix

  // After computing displaced normals, pass through Phong shader from earlier
  // - Essentially, just copy-pasta Phong shader code here

  // copy pasta from blinn-phong here
  float ka = 0.1;
  float kd = 1.0;
  float ks = 1.0;
  float p = 100.0;
  vec3 Ia = vec3(1.0, 1.0, 1.0);

  vec3 I_rsq = normalize(u_light_intensity);
  vec3 l = normalize(u_light_pos - vec3(v_position));
  vec3 n = normalize(n_displaced);
  vec3 v_dir = normalize(u_cam_pos - vec3(v_position));
  vec3 h = normalize(l + v_dir);

  vec3 diffuse = max(dot(n, l), 0.0) * kd * I_rsq;
  float specular_angle = max(dot(h, n), 0.0);
  vec3 specular = pow(specular_angle, p) * ks * I_rsq;

  out_color = vec4(((ka * Ia) + diffuse + specular)*vec3(u_color), 1.0);
}